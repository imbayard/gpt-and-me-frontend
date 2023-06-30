import React, { useState } from 'react';
import './TreeItem.css';
import { LearnSomething } from '../models';
import { generateChildLearnSOmething, getLearnSomethings } from '../api';
import Loader from './Loader';

const TreeItem: React.FC<{ 
    node: LearnSomething; 
    rootId: string;
    level: number;
    setLearnSomethings: React.Dispatch<React.SetStateAction<LearnSomething[]>>
    isRoot: boolean;
}> = ({ node, level, rootId, setLearnSomethings, isRoot }) => {

    async function handleGenerateSeed(child: string) {
        setIsLoadingNewSeed(true)
        console.log(child, rootId)
        const didSucceed = await generateChildLearnSOmething(child, rootId)
        if(didSucceed) {
            const ls = await getLearnSomethings()
            setLearnSomethings(ls)
        }
        setIsLoadingNewSeed(false)
    }

    const [openNode, setOpenNode] = useState('')
    const [isLoadingNewSeed, setIsLoadingNewSeed] = useState(false)

    return (
        <div className='tree-item' style={{ paddingLeft: `${(level + 1) * 20}px` }}>
            <h3>{node.seed}</h3>
            <p className='tree-lesson'>{node.lesson}</p>
            {node.topics.map(childNode => (
                <div className='tree-child' key={childNode.seed.replace('/\\s/g', '')}>
                    <p className='child-name' onClick={() => setOpenNode(childNode.seed === openNode ? '' : childNode.seed)}>{childNode.seed}</p>
                    <div className={`tree-drawer ${openNode === childNode.seed ? 'open' : ''}`}>
                        <div className='tree-item-wrapper'>
                            <TreeItem isRoot={false} node={childNode} level={level} rootId={rootId} setLearnSomethings={(ls) => setLearnSomethings(ls)}/>
                            {childNode.lesson ? <></> : 
                            !isLoadingNewSeed ? 
                            (<button 
                                className='generate-seed-button'
                                onClick={() => handleGenerateSeed(childNode.seed)}>Keep Digging!
                            </button>) : <Loader message='Generating Lesson...'/>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TreeItem;
