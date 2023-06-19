export interface Categories {
  work: string,
  workout: string,
  sanity: string,
  food: string,
  finance: string
}

export interface PracticeFilter {
  time: number,
  goal: string,
  category: string
}

export interface StudyPlan {
    chapters: TextbookChapter[]
    num_chapters_done: number
    num_chapters: number
    done: boolean
}

export interface TextbookChapter {
    chapter_name: string
    topics?: Topic[]
    num_topics_done?: number
    num_topics?: number
    done?: boolean
}

export interface Topic {
    topic_name: string
    lesson?: string
    done?: boolean
}

export interface StudyPlansForProfile {
    work?: StudyPlan,
    workout?: StudyPlan,
    sanity?: StudyPlan,
    food?: StudyPlan,
    finance?: StudyPlan
}

export interface UserProfile {
  name: string,
  email: string,
  goals: Categories,
  studyPlans?: StudyPlansForProfile
}