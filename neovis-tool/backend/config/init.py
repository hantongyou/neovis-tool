import os

# 初始化，首先将敏感变量融入系统环境变量中

config = {
    #neo4j配置
    "NEO4J_URL":"bolt://localhost:7687",
    "NEO4J_ACCOUNT":"neo4j",
    "NEO4J_PASSWD":"123456"
}
def init():
    for key,value in config.items():
        os.environ[key] = value








