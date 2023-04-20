export type CourseType = {
  id: number,
  short: string
  title: string,
  files: FileType[],
  comments: CommentType[]
};

export type FileType = {
  id: number,
  name: string
  author: string,
  datePublished: string,
  filetype: string,
  url: string,
  thumbnail: string,
  size: string,
  likes: number,
  dislikes: number,
  numberOfDownloads: number,
  comments: CommentType[]
}

export type NewsType = {
  id: number,
  date: string
  content: string
}

export type CommentType = {
  id: number,
  commentText: string,
  type: "File" | "Course",
  typeId: number,
  typeName: string,
  author: string,
  datePublished: string
}

export type UserType = {
  id: number,
  name: string,
  email: string
}