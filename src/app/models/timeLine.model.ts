export class TimeLineModel{
  idTimeline: string
  description: string = ""

  title: string
  fromTimeDisplay: string
  fromTime: number = 0
  toTimeDisplay: string
  toTime: number = 0


  modifyBy: string
  modifyDate: number
  isDelete: boolean
  idSchedule: string
  idScheduleTmp: string
}


export class ValidateTimelineModel{
  total: number
  title: string = null
  fromTime: number = 0
  toTime: number = 0
  description: string = null
}
