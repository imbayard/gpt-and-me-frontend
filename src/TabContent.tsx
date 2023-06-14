import React, { useState } from 'react';
import './TabContent.css';
import { getChapterTopics, getTextbookChapters, getTopicLesson, updateStudyPlan } from './api';
import { TabContentComponentProps } from './lib/tab-util';
import { TextbookChapter, Topic } from './models';
import { CiCircleCheck } from 'react-icons/ci';

const TabContent = ({goal, studyPlan, category}: TabContentComponentProps) => {

  async function handleClick() {
    setIsLoading(true)
    const response = await getTextbookChapters(goal, category)

    const mapped_chapters = response.map(chapter => {
      return {chapter_name: chapter}
    })

    setChapters(mapped_chapters)
    setIsLoading(false)
  }

  const testData = [
    {chapter_name: 'Chapter 1'},
    {chapter_name: 'Chapter 2'},
    {chapter_name: 'Chapter 3'},
    {chapter_name: 'Chapter 4'},
    {chapter_name: 'Chapter 5'},
  ]

  const [selectedChapter, setSelectedChapter] = useState(-1);
  const [selectedTopic, setSelectedTopic] = useState(-1);
  const [isLoading, setIsLoading] = useState(false)
  const [chapters, setChapters] = useState((studyPlan && studyPlan.chapters ? studyPlan.chapters : testData) as TextbookChapter[])
  const [topics, setTopics] = useState([] as Topic[])
  const [lesson, setLesson] = useState('')

  const hasChapters = () => {
    return chapters && chapters[0]
  }

  const handleTopicClick = async (chapter_index: number, topic_index: number) => {
    const chapter = chapters[chapter_index]
    const chapter_name = chapter.chapter_name
    const topic = topics[topic_index]
    const topic_name = topic.topic_name
    let lesson = topic.lesson || ''

    if(lesson === '' && studyPlan) {
      setIsLoading(true)
      const response = await getTopicLesson(goal, chapter_name, studyPlan, category, topic_name)
      lesson = response.data.lesson
      setIsLoading(false)
    }
    
    setSelectedTopic(selectedTopic === topic_index ? -1 : topic_index)
    setLesson(lesson)
  }

  const handleChapterClick = async (index: number) => {
    const chapter = chapters[index]
    const chapter_name = chapter.chapter_name
    let response_topics = chapter.topics
    let coerce_topics = []

    if((!response_topics || !response_topics[0]) && studyPlan) {
      setIsLoading(true)
      const response_topics = await getChapterTopics(goal, chapter_name, studyPlan, category)
      coerce_topics = response_topics.map((topic) => ({topic_name: topic}))
      setIsLoading(false)
    } else {
      coerce_topics = chapter.topics || []
    }
    setTopics(coerce_topics)
    setSelectedChapter(selectedChapter === index ? -1 : index)
  };

  async function handleMarkLessonRead(selectedChapter: number, selectedTopic: number) {
    const chapter = chapters[selectedChapter]
    const topic = chapter.topics?.[selectedTopic]
    if(topic) {
      // TODO: Handle error
      topic.done = true
      studyPlan.chapters = chapters
      const studyPlanUpdated = await updateStudyPlan(studyPlan, category)
      console.log(studyPlanUpdated)
    }

  }

  return (
    <div className='TabContent'>
      <div className="goal-container">
        <h1 className="goal-title">Your Goal:</h1>
        <p className="goal-text">{(category).toLocaleUpperCase()}: <strong>{goal}</strong></p>
      </div>
      <div className="study-plan-header">
        <h1 className="study-plan-title">Study Plan</h1>
        {isLoading ? (
            <>
              <div className="loader"></div>
              <p>Getting feedback from GPT...</p>
            </>
          ) : (
            <button className={hasChapters() ? "study-plan-button" : "study-plan-button enhanced"} onClick={() => handleClick()}>Get Plan</button>
          )}
      </div>
      {hasChapters() ? (chapters.map((chapter, i) => {
        const name = chapter.chapter_name

        return(
          <div key={i} className='chapter-enclosure'>
            <div key={`chapter-${i}`} className='chapter' onClick={() => handleChapterClick(i)}>
              <div className='chapter-name'>{i+1}. {name}</div>
              <div className='chapter-num-chapters'> 
                { 
                  (!chapter.num_topics || chapter.num_topics === 0) ? 'Click to Generate Topics' : `Topics Read: ${chapter.num_topics_done}/${chapter.num_topics}`
                }
              </div>
              <div className='chapter-done'>{chapter.done ? <CiCircleCheck size={'25px'}/> : ''}</div>
            </div>
            <div key={`drawer-${i}`} className={`chapter-drawer ${selectedChapter === i ? 'open' : ''}`}>
              {topics && topics.map((topic, j) => (
                <div key={`topic-enclosure${j}`}>
                  <div className='topic' key={`topic-${j}`} onClick={() => handleTopicClick(i, j)}>
                    {`${i+1}.${j+1} ${topic.topic_name}`}
                    <div className='topic-done'>{topic.done ? <CiCircleCheck size={'20px'} /> : ''}</div>
                  </div>
                  <div className={`topic-drawer ${selectedTopic === j ? 'open' : ''}`} key={`drawer-${i}.${j}`}>
                    <div className='lesson-tip'>Make sure to take notes (pen and paper recommended)</div>
                    <div className='lesson-content'>{lesson}</div>
                    <div className='mark-lesson-done' onClick={() => handleMarkLessonRead(selectedChapter, selectedTopic)}>Mark Read</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })) : 
        (<h1 className='prompt-to-click'>Click 'Get Plan' to get a study plan for reaching your goal</h1>)
      }
    </div>
  );
};

export default TabContent;
