import {
  SquareX,
  Search,
  SquareChevronLeft,
  SquareChevronRight,
  SquareCheck,
  ArrowRightToLine,
  TriangleAlert,
  FlaskConical,
  House,
  PackageSearch,
  Settings,
  User,
  LogOut,
  EllipsisVertical,
  Play,
  Pause,
  Trash2,
  Download,
  History,
  ClipboardList,
} from 'lucide-react'
// Icon configuration object
const IconComponents = {
  delete: (props) => <SquareX {...props} />,
  search: (props) => <Search {...props} strokeWidth={3} />,
  arrowRight: (props) => <ArrowRightToLine {...props} />,
  alert: (props) => <TriangleAlert {...props} />,
  home: (props) => <House {...props} />,
  lab: (props) => <FlaskConical {...props} />,
  product: (props) => <PackageSearch {...props} />,
  settings: (props) => <Settings {...props} />,
  user: (props) => <User {...props} />,
  chevronLeft: (props) => <SquareChevronLeft {...props} />,
  chevronRight: (props) => <SquareChevronRight {...props} />,
  check: (props) => <SquareCheck {...props} />,
  logOut: (props) => <LogOut {...props} />,
  ellipsisVerticalIcon: (props) => <EllipsisVertical {...props} />,
  play: (props) => <Play {...props} />,
  pause: (props) => <Pause {...props} />,
  trash: (props) => <Trash2 {...props} />,
  downloadIcon: (props) => <Download {...props} />,
  automationIcon: (props) => <History {...props} />,
  historyIcon: (props) => <ClipboardList {...props} />,
}

// Export individual components with default names for backward compatibility
export const DeleteIcon = IconComponents.delete
export const SearchIcon = IconComponents.search
export const ArrowRight = IconComponents.arrowRight
export const AlertIcon = IconComponents.alert
export const HomeIcon = IconComponents.home
export const LabIcon = IconComponents.lab
export const ProductIcon = IconComponents.product
export const SettingsIcon = IconComponents.settings
export const UserIcon = IconComponents.user
export const LogOutIcon = IconComponents.logOut
export const EllipsisVerticalIcon = IconComponents.ellipsisVerticalIcon
export const PlayIcon = IconComponents.play
export const PauseIcon = IconComponents.pause
export const TrashIcon = IconComponents.trash
export const DownloadIcon = IconComponents.downloadIcon
export const AutomationIcon = IconComponents.automationIcon
export const HistoryIcon = IconComponents.historyIcon
