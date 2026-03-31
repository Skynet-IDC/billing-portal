// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem
          href={`/${locale}/dashboards`}
          icon={<i className='tabler-smart-home' />}
          exactMatch={false}
          activeUrl='/dashboards'
        >
          {dictionary['navigation'].dashboards}
        </MenuItem>
        <MenuSection label={dictionary['navigation'].service}>
          <MenuItem
            href={`/${locale}/vm/instances`}
            icon={<i className='tabler-server' />}
            exactMatch={false}
            activeUrl='/vm/instances'
          >
            {dictionary['cloud'].vm_instance}
          </MenuItem>
          <MenuItem
            href={`/${locale}/databases`}
            icon={<i className='tabler-database' />}
            exactMatch={false}
            activeUrl='/databases'
          >
            {dictionary['cloud'].database}
          </MenuItem>
          <MenuItem
            href={`/${locale}/hosting`}
            icon={<i className='tabler-brand-wordpress' />}
            exactMatch={false}
            activeUrl='/hosting'
          >
            {dictionary['hosting'].websites}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].domains} icon={<i className='tabler-world-www' />}>
            <MenuItem href={`/${locale}/domain`}>{dictionary['domain'].domains}</MenuItem>
            <MenuItem href={`/${locale}/domain/register`}>{dictionary['domain'].register}</MenuItem>
            <MenuItem href={`/${locale}/domain/transfer`}>{dictionary['domain'].transfer}</MenuItem>
            <MenuItem href={`/${locale}/domain/whois`}>{dictionary['domain'].who_is}</MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['cloud'].network} icon={<i className='tabler-network' />}>
            <MenuItem href={`/${locale}/network/firewall`}>{dictionary['network'].firewall}</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].account}>
          <SubMenu label={dictionary['navigation'].billing} icon={<i className='tabler-file-dollar' />}>
            <MenuItem href={`/${locale}/billing/invoice`}>{dictionary['billing'].invoice}</MenuItem>
            <MenuItem href={`/${locale}/billing/quotes`}>{dictionary['billing'].quotes}</MenuItem>
            <MenuItem href={`/${locale}/billing/credit`}>{dictionary['billing'].credits}</MenuItem>
          </SubMenu>
          <MenuItem
            href={`/${locale}/ssh-keys`}
            icon={<i className='tabler-shield' />}
            exactMatch={false}
            activeUrl='/ssh-keys'
          >
            {dictionary['navigation'].ssh_keys}
          </MenuItem>
          <MenuItem
            href={`/${locale}/api-docs`}
            icon={<i className='tabler-api' />}
            exactMatch={false}
            activeUrl='/api-docs'
          >
            {dictionary['navigation'].api_docs}
          </MenuItem>
          <MenuItem
            href={`/${locale}/affiliates`}
            icon={<i className='tabler-affiliate' />}
            exactMatch={false}
            activeUrl='/affiliates'
          >
            {dictionary['navigation'].affiliate}
          </MenuItem>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].support}>
          <MenuItem
            href={`/${locale}/tickets`}
            icon={<i className='tabler-ticket' />}
            exactMatch={false}
            activeUrl='/tickets'
          >
            {dictionary['support'].tickets}
          </MenuItem>
          <MenuItem
            href={`/${locale}/contact`}
            icon={<i className='tabler-address-book' />}
            exactMatch={false}
            activeUrl='/contact'
          >
            {dictionary['support'].contact_us}
          </MenuItem>
          <MenuItem
            href={`/${locale}/documents`}
            icon={<i className='tabler-file' />}
            exactMatch={false}
            activeUrl='/documents'
          >
            {dictionary['support'].documents}
          </MenuItem>
          <MenuItem
            href={`/${locale}/downloads`}
            icon={<i className='tabler-download' />}
            exactMatch={false}
            activeUrl='/downloads'
          >
            {dictionary['support'].downloads}
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
