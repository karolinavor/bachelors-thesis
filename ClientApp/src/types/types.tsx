export type CourseType = {
  id: number,
  short: string
  title: string,
  files?: Array<FileType>
};

export type FileType = {
  id: number,
  name: string
}

export type NewsType = {
  id: number,
  date: string
  content: string
}