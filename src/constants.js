export const PLATFORMS = {
  LINKEDIN: 'LinkedIn',
  JOBSTREET: 'Jobstreet',
  KALIBRR: 'Kalibrr',
  INDEED: 'Indeed'
}

import linkedInIcon from '@assets/platform-icons/linkedIn.svg'
import jobstreetIcon from '@assets/platform-icons/jobstreet.svg'
import kalibrrIcon from '@assets/platform-icons/kalibrr.svg'
import indeedIcon from '@assets/platform-icons/indeed.svg'

export const PLATFORM_ICONS = {
  LINKEDIN: linkedInIcon,
  JOBSTREET: jobstreetIcon,
  KALIBRR: kalibrrIcon,
  INDEED: indeedIcon
}
export const OPERATION_STATUS = {
  IDLE: 'IDLE',
  PROCESSING: 'PROCESSING',
  FINISHED: 'FINISHED',
  ERROR: 'ERROR'
}

export const PLATFORM_STATUS = {
  IDLE: 'idle',
  PROCESSING: 'processing',
  WAITING: 'waiting',
  FINISHED: 'finished',
  ERROR: 'error'
}

// You might also want connection status constants
export const CONNECTION_STATUS = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error'
}

export const DATE_RANGES = {
  PAST_24_HOURS: 'PAST_24_HOURS',
  PAST_WEEK: 'PAST_WEEK',
  PAST_15_DAYS: 'PAST_15_DAYS',
  PAST_MONTH: 'PAST_MONTH'
}

export const DATE_RANGE_LABELS = {
  [DATE_RANGES.PAST_24_HOURS]: 'Past 24 hours',
  [DATE_RANGES.PAST_WEEK]: 'Past week',
  [DATE_RANGES.PAST_15_DAYS]: 'Past 15 days',
  [DATE_RANGES.PAST_MONTH]: 'Past month'
}

// Add action type constants
export const ACTION_TYPES = {
  TOGGLE_PLATFORM: 'TOGGLE_PLATFORM',
  UPDATE_PLATFORM_STATUS: 'UPDATE_PLATFORM_STATUS',
  RESET_PLATFORMS: 'RESET_PLATFORMS',
  SET_AUTH: 'SET_AUTH',
  SET_CONNECTION: 'SET_CONNECTION',
  SET_MESSAGE: 'SET_MESSAGE',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE',
  SET_CONNECTION_STATUS: 'SET_CONNECTION_STATUS',
  UPDATE_HEARTBEAT: 'UPDATE_HEARTBEAT',
  UPDATE_OPERATION_STATUS: 'UPDATE_OPERATION_STATUS',
  SET_PLATFORMS_ERROR: 'SET_PLATFORMS_ERROR',
  RESET_OPERATION_STATUS: 'RESET_OPERATION_STATUS'
}

export const STORAGE_KEYS = {
  BEARER_TOKEN_KEY: 'sweeper_bearer'
}
