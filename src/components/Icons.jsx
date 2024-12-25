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
  LogOut
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
    logOut: (props) => <LogOut {...props}/>
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
