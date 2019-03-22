import { home as homeModel } from '@/models/home'
import { login as loginModel } from '@/models/login'
import { maps as mapsModel } from '@/models/maps'
import { messages as messagesModel } from '@/models/messages'
import { notifications as notificationsModel } from '@/models/notifications'
import { pins as pinsModel } from '@/models/pins'
import { post as postModel } from '@/models/post'
import { preferences as preferencesModel } from '@/models/preferences'
import { route as routeModel } from '@/models/route'
import { search as searchModel } from '@/models/search'
import { signup as signupModel } from '@/models/signup'
import { user as userModel } from '@/models/user'

export const home = homeModel
export const login = loginModel
export const maps = mapsModel
export const messages = messagesModel
export const notifications = notificationsModel
export const pins = pinsModel
export const post = postModel
export const preferences = preferencesModel
export const route = routeModel
export const search = searchModel
export const signup = signupModel
export const user = userModel

export default {
  home,
  login,
  maps,
  messages,
  notifications,
  pins,
  post,
  preferences,
  route,
  search,
  signup,
  user,
}
