import os
import sys

from . import init



sys.path.append(os.path.abspath("."))

class Neo4jConfig:
    def __init__(self):
        self.NEO4J_URL = os.environ['NEO4J_URL']
        self.NEO4J_ACCOUNT = os.environ['NEO4J_ACCOUNT']
        self.NEO4J_PASSWD = os.environ['NEO4J_PASSWD']
        
init.init()
neo4jConf = Neo4jConfig()

