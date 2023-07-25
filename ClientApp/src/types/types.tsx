export type CourseType = {
  id: number,
  dateAdded: Date,
  short: string
  title: string,
};

export type FileType = {
  id: number,
  name: string
  author: string,
  dateAdded: Date,
  filetype: string,
  url: string,
  size: number,
  /*
  likes: number,
  dislikes: number,
  */
  numberOfDownloads: number,
  courseId: number
}

export type NewsType = {
  id: number,
  dateAdded: Date,
  content: string
}

export type CommentType = {
  id: number,
  commentText: string,
  dateAdded: Date,
  author: string,
  fileId: number,
  courseId: number,
  categoryName: string
}

export type UserType = {
  id: number,
  name: string,
  username : string,
  email: string,
  profileImage: string
}