from pathlib import Path

import pandas as pd
import numpy as np
from cvxopt import matrix, solvers


ROOT = Path(__file__).parent


def get_index_change():
    path = ROOT / "指数行情序列.csv"
    df = pd.read_csv(path, index_col=None)
    df["日期"] = pd.to_datetime(df["日期"], format="%Y/%m/%d")
    df = df.set_index("日期").sort_index()
    df = df.pct_change().dropna()
    return df


def get_fund_increase():
    path = ROOT / "004685.csv"
    df = pd.read_csv(path, index_col=None)
    df["日期"] = pd.to_datetime(df["TRADINGDATE"])
    df = df.set_index("日期").sort_index()
    df = df[["ADJUSTEDNAV"]].pct_change().dropna()
    return df


def prepare_data():
    indx = get_index_change()
    fund = get_fund_increase()
    df = indx.join(fund)
    return df


def get_rbsa(df: pd.DataFrame):
    # 假设有两类资产 A 和 B，它们的收益率分别为 returns_A 和 returns_B
    df = df[["ADJUSTEDNAV", "大盘成长", "大盘价值", "小盘成长", "小盘价值", "中债-总财富(总值)指数"]]

    # 协方差矩阵
    cov_matrix = df.cov().values

    # 定义问题变量
    n_index = len(df.columns) - 1
    # 我们只关心与基准指数相关的协方差部分
    P = matrix(cov_matrix[1:, 1:])
    # 目标函数的线性项向量
    q = matrix(-cov_matrix[0, 1:])

    # 定义不等式约束 Gw <= h，这里的不等式约束为 w >= 0
    G = matrix(-np.eye(n_index))  # 权重非负
    h = matrix(np.zeros(n_index))

    # 定义等式约束 Aw = b，这里的等式约束为 sum(w) = 1
    A = matrix(1.0, (1, n_index))
    b = matrix(1.0)

    # 求解问题
    solvers.options['show_progress'] = False
    solution = solvers.qp(P, q, G, h, A, b, maxiters=1e8)

    # 提取最优解
    optimal_weights = solution['x']

    columns = df.columns[1:]
    s = pd.Series(optimal_weights, index=columns)
    return s


def run():
    df = prepare_data()
    df = df.reset_index()
    df["日期"] = df["日期"].apply(lambda x: x.strftime("%Y-%m"))
    df = df.groupby("日期")
    for date, dt in df:
        yield date, dt


if __name__ == "__main__":
    dataset = []
    for date, dt in run():
        s = get_rbsa(dt)
        s.name = date
        dataset.append(s)

    df = pd.concat(dataset, axis=1).T
    df = np.round(df, 4)
    print(df)
