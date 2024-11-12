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
  Download
} from 'lucide-react'

const DeleteIcon = () => <SquareX />
const SearchIcon = () => <Search strokeWidth={3} />
const ArrowRight = () => <ArrowRightToLine />
const AlertIcon = () => <TriangleAlert />
const HomeIcon = () => <House />
const LabIcon = () => <FlaskConical />
const ProductIcon = () => <PackageSearch />
const SettingsIcon = () => <Settings/>
const DownloadIcon = () => <Download/>

export {
    DeleteIcon,
    SearchIcon,
    SquareChevronLeft,
    SquareChevronRight,
    SquareCheck,
    ArrowRight,
    AlertIcon,
    HomeIcon,
    LabIcon,
    ProductIcon,
    SettingsIcon,
    DownloadIcon
}
