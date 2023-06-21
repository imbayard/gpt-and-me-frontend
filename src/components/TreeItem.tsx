import React, { useEffect, useState } from 'react';
import './TreeItem.css';
import { LearnSomething } from '../models';

const TreeItem: React.FC<{ node: LearnSomething; level: number }> = ({ node, level }) => {

    return (
    <div className='tree-item' style={{ paddingLeft: `${(level + 1) * 20}px` }}>
        <h3>{node.seed}</h3>
        <p className='tree-lesson'>{node.lesson}</p>
        {node.topics.map(childNode => (
            <TreeNode key={childNode.seed.replace('/\\s/g', '')} node={childNode} level={level + 1} />
        ))}
    </div>
    );
};

const TreeNode: React.FC<{ node: LearnSomething; level: number }> = ({ node, level }) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        console.log("Node did update", node) 
     }, [node])
    return (
        <div className='tree-child'>
            <p className='child-name' onClick={() => setIsOpen(!isOpen)}>{node.seed}</p>
            <div className={`tree-drawer ${isOpen ? 'open' : ''}`}>
                <TreeItem node={node} level={level} />
            </div>
        </div>
    );
};

export default TreeItem;
