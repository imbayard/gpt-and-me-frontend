import React, { useState } from 'react';
import { Tree } from 'react-d3-tree';
import Modal from 'react-modal';
import { LearnSomething } from '../models';

interface MindMapProps {
  data: LearnSomething;
}

Modal.setAppElement('#root');

const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState<LearnSomething | null>(null);

  const openModal = (node: any) => {
    console.log(node)
    setCurrentNode(node);
    
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const convertToTreeNode = (node: LearnSomething): any => {
    return {
      name: node.seed,
      obj: node,
      attributes: {
        'Done': node.done ? 'Yes' : 'No',
      },
      children: node.topics.map(convertToTreeNode),
    };
  };

  const rootNode = convertToTreeNode(data);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Tree
        data={rootNode}
        translate={{ x: 100, y: 200 }}
        nodeSize={{ x: 200, y: 100 }}
        shouldCollapseNeighborNodes={true}
        onNodeClick={(obj) => openModal((obj as any).data.obj)}
        hasInteractiveNodes={true}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Node Information"
      >
        <h2>{currentNode?.seed}</h2>
        <p>{currentNode?.lesson}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default MindMap;
