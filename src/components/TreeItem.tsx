import React, { useState } from 'react';
import './TreeItem.css';
import { LearnSomething } from '../models';
import { generateChildLearnSOmething, getLearnSomethings } from '../api';

const TreeItem: React.FC<{ 
    node: LearnSomething; 
    rootId: string;
    level: number;
    setLearnSomethings: React.Dispatch<React.SetStateAction<LearnSomething[]>>
}> = ({ node, level, rootId, setLearnSomethings }) => {

    async function handleGenerateSeed(child: string) {
        console.log(child, rootId)
        const didSucceed = await generateChildLearnSOmething(child, rootId)
        if(didSucceed) {
            const ls = await getLearnSomethings()
            setLearnSomethings(ls)
        }
    }

    const [openNode, setOpenNode] = useState('')

    return (
        <div className='tree-item' style={{ paddingLeft: `${(level + 1) * 20}px` }}>
            <h3>{node.seed}</h3>
            <p className='tree-lesson'>{node.lesson}</p>
            {node.topics.map(childNode => (
                <div className='tree-child' key={childNode.seed.replace('/\\s/g', '')}>
                    <p className='child-name' onClick={() => setOpenNode(childNode.seed === openNode ? '' : childNode.seed)}>{childNode.seed}</p>
                    <div className={`tree-drawer ${openNode === childNode.seed ? 'open' : ''}`}>
                        <div className='tree-item-wrapper'>
                            <TreeItem node={childNode} level={level} rootId={rootId} setLearnSomethings={(ls) => setLearnSomethings(ls)}/>
                            {childNode.lesson ? <></> : 
                            <button 
                                className='generate-seed-button'
                                onClick={() => handleGenerateSeed(childNode.seed)}>Keep Digging!
                            </button>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TreeItem;
