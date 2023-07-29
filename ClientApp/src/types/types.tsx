export type CourseType = {
  courseId: number,
  dateAdded: Date,
  short: string
  title: string,
  notificationSet: boolean
};

export type FileType = {
  courseFileId: number,
  name: string
  userId: number,
  dateAdded: Date,
  filetype: string,
  url: string,
  size: number,
  /*
  likes: number,
  dislikes: number,
  */
  numberOfDownloads: number,
  courseId: number,
  notificationSet: boolean
}

export type NewsType = {
  newsId: number,
  dateAdded: Date,
  content: string
}

export type CommentType = {
  commentId: number,
  commentText: string,
  dateAdded: Date,
  userId: number,
  fileId: number,
  courseId: number,
  categoryName: string,
  likes: number,
  dislikes: number
}

export type UserType = {
  userId: number,
  name: string,
  username : string,
  email: string,
  profileImage: string
}

export type NotificationType = {
  notificationId: number,
  userId: number,
  courseId: number,
  courseFileId: number
}

export type LogType = {
  logId: number,
  userId: number,
  dateAdded: Date,
  commentId: number,
  newsId: number,
  courseId: number,
  courseFileId: number
  event: number
}