from fastapi import FastAPI
from py2neo import Graph,Node,Relationship
import json
from config.neo4jConfig import neo4jConf 

app = FastAPI()

# 全局变量db为neo4j数据库实例
db = None

# 登录neo4j数据库实例
@app.get('/LoginNeo4j')
async def root():
    global db
    db = Graph(neo4jConf.NEO4J_URL,username=neo4jConf.NEO4J_ACCOUNT,password = neo4jConf.NEO4J_PASSWD)
    res = {}
    res["status"] = "OK"
    res["labels"] = [a["labels(N)"][0] for a in db.run("MATCH(N) RETURN DISTINCT labels(N)")]
    res["relations"] = [a["type(R)"] for a in db.run("MATCH(N)-[R]-(M) RETURN DISTINCT type(R)")]
    
    return res

# 
# @app.get('/')
    
