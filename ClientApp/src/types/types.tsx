export type CourseType = {
  courseId: number,
  dateAdded: Date,
  short: string
  title: string,
};

export type FileType = {
  courseFileId: number,
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
  newsId: number,
  dateAdded: Date,
  content: string
}

export type CommentType = {
  commentId: number,
  commentText: string,
  dateAdded: Date,
  author: string,
  fileId: number,
  courseId: number,
  categoryName: string
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