import React, { useState } from 'react';
import './Tabs.css';
import { UserProfile } from './models';
import { mapTabs, TabContent } from './lib/tab-util';

const Tabs = (userProfile: UserProfile) => {
  const tabs = mapTabs(userProfile)

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="tabs">
      <div className="tab-list">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab.name.category === tab.name.category ? 'active' : ''}`}
          >
            {tab.icon}
            <span className="tab-name">{tab.name.category}</span>
          </button>
        ))}
      </div>
      <TabContent content={activeTab} />
    </div>
  );
};

export default Tabs;
