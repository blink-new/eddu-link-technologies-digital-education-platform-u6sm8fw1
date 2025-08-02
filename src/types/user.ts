export type UserRole = 'student' | 'teacher' | 'parent' | 'publisher' | 'government' | 'ngo'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

export interface Student extends User {
  role: 'student'
  grade: string
  subjects: string[]
  parentId?: string
}

export interface Teacher extends User {
  role: 'teacher'
  subjects: string[]
  classes: string[]
}

export interface Parent extends User {
  role: 'parent'
  children: string[]
}

export interface Publisher extends User {
  role: 'publisher'
  organization: string
  approvedBooks: string[]
}

export interface Government extends User {
  role: 'government'
  region: string
  permissions: string[]
}