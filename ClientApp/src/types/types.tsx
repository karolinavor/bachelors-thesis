export type CourseType = {
  courseID: number,
  dateAdded: Date,
  short: string
  title: string,
  notificationSet: boolean
};

export type FileType = {
  courseFileID: number,
  name: string
  userID: number,
  dateAdded: Date,
  filetype: string,
  url: string,
  size: number,
  likes: number,
  dislikes: number,
  reacted: number,
  numberOfDownloads: number,
  courseID: number,
  notificationSet: boolean
}

export type NewsType = {
  newsID: number,
  dateAdded: Date,
  content: string
}

export type CommentType = {
  commentID: number,
  commentText: string,
  dateAdded: Date,
  userID: number,
  courseFileID: number,
  courseID: number,
  categoryName: string,
  likes: number,
  dislikes: number,
  reacted: number
}

export type UserType = {
  userID: number,
  name: string,
  username : string,
  email: string,
  profileImage: string
}

export type NotificationType = {
  notificationID: number,
  userID: number,
  courseID: number,
  courseFileID: number,
  dateAdded: Date,
  read: boolean
}

export type LogType = {
  logID: number,
  userID: number,
  dateAdded: Date,
  commentID: number,
  newsID: number,
  courseID: number,
  courseFileID: number
  event: number
}