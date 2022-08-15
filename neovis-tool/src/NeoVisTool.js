import React,{useEffect,useRef} from 'react'
import PropTypes from 'prop-types'
import * as NeoVis from 'neovis.js'


const NeoGraph = (props)=>{
    const{
        width,
        height,
        containerId,
        backgroundColor,
        neo4jUrl,
        neo4jAccount,
        neo4jPassword,
        labels,
        relationships,
        cypher
    }=props;
    const visRef = useRef();
    useEffect(()=>{

        const NeoLabels = {};
        const NeoRelations = {};
        // console.log(labels)
        // labels 为节点类型列表，形式为[nodeType a,nodeType b...]
        for(let i=0;i<labels.length;i++){
        NeoLabels[labels[i]]={
            label:labels[i],
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:labels[i],
                },
                function:{
                    title:(node)=>{
                        // console.log(Object.keys(node.properties));
                        return NeoVis.objectToTitleHtml(node, Object.keys(node.properties))}}
            }
        }
    }   
        for(let i=0;i<relationships.length;i++){
            NeoRelations[relationships[i]]={
                [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                    function:{
                        label:(relation)=>{
                            console.log(relation);
                            return relation.type
                        }
                    }
                }
            }
        }


        // 最新版本的写法和过往版本有细微区别
        const NeoVisConfig = {
            containerId:containerId,
            neo4j:{
                serverUrl:neo4jUrl,
                serverUser:neo4jAccount,
                serverPassword:neo4jPassword
            },
            // 样式设置；支持修改样式
            visConfig:{
                nodes:{
                    shape:"ellipse"
                },
                edges:{
                    arrows:{
                        from:{
                            enabled:false
                        },
                        to:{
                            enabled:true
                        }
                    },
                    color:"black"
                }
            },
            // labels即节点信息，可以从axios异步获取
            // relationships即关系信息，同理可以用axios异步的方式获取
            
            labels:NeoLabels,
            relationships:NeoRelations,
            initialCypher:cypher
        };
        const vis = new NeoVis.NeoVis(NeoVisConfig);
        vis.render();
    },[containerId,neo4jUrl,neo4jAccount,neo4jPassword,labels,relationships,cypher])
    return(
        <div
        id={containerId}
        ref={visRef}
        style={{
            width:`${width}px`,
            height:`${height}px`,
            backgroundColor:`${backgroundColor}`
        }}
        >

        </div>
    )
}

// 默认设置
NeoGraph.defaultProps = {
    width:600,
    height:600,
    backgroundColor:"white",
    containerId:"vis"
}

// 数据类型设置
NeoGraph.propTypes = {
    containerId:PropTypes.string,
    neo4jUrl:PropTypes.string.isRequired,
    neo4jAccount:PropTypes.string.isRequired,
    neo4jPassword:PropTypes.string.isRequired,
    backgroundColor:PropTypes.string
}

export {NeoGraph}
