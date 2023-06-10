import React, { FC } from 'react'
import { Categories, StudyPlan, StudyPlansForProfile, UserProfile } from "../models"
import { CiBank, CiDumbbell, CiStar, CiForkAndKnife, CiBadgeDollar } from 'react-icons/ci';
import TabContentComponent from '../TabContent';

interface TabTypeMappingStructure {
    category: string,
    icon: React.JSX.Element
}

interface TabType {
    name: {category: string}
    icon: React.JSX.Element
    content: React.JSX.Element
}

interface TabContentProps {
    content: any;
}

export interface TabContentComponentProps {
    goal: string
    studyPlan: StudyPlan
    category: string
    key: string
}

const Tab = ({goals, studyPlans}: UserProfile, category: string, icon: React.JSX.Element): TabType => ({
    name: {category}, 
    icon,
    content: <TabContentComponent 
                goal={goals[category as keyof Categories]} 
                studyPlan={getStudyPlan(studyPlans, category)} 
                category={category} 
                key={category} 
              /> 
})

function getStudyPlan(studyPlans: StudyPlansForProfile | undefined, category: string): StudyPlan {
    const default_ = {chapters: [], num_chapters: 0, num_chapters_done: 0, done: false}
    if(!studyPlans) {
        return default_
    }
    const studyPlan = studyPlans[category as keyof StudyPlansForProfile] 
    return studyPlan ? studyPlan : default_
}

export function mapTabs(userProfile: UserProfile): TabType[] {
    const categories: TabTypeMappingStructure[] = [
      {category: 'work', icon: <CiBank />}, {category: 'workout', icon: <CiDumbbell />}, 
      {category: 'fun', icon: <CiStar />}, {category: 'food', icon: <CiForkAndKnife />}, 
      {category: 'finance', icon: <CiBadgeDollar />}
    ]
    
    return categories.map(({category, icon}) => {
      return Tab(userProfile, category, icon)
    })
}
  
export const TabContent: FC<TabContentProps> = ({ content }: TabContentProps) => (
    <div className="tab-content">
        { content.content }
    </div>
)