import React, {useState} from 'react';
import {Box} from '../styles/box';
import {Sidebar} from './sidebar.styles';
import {Avatar, Tooltip} from '@nextui-org/react';
import {Flex} from '../styles/flex';
import {HomeIcon} from '../icons/sidebar/home-icon';
import {ReportsIcon} from '../icons/sidebar/reports-icon';
import {SettingsIcon} from '../icons/sidebar/settings-icon';
import {CollapseItems} from './collapse-items';
import {SidebarItem} from './sidebar-item';
import {SidebarMenu} from './sidebar-menu';
import {FilterIcon} from '../icons/sidebar/filter-icon';
import {useSidebarContext} from '../layout/layout-context';
import {useRouter} from 'next/router';
import {DatasetIcon} from '../icons/sidebar/dataset-icon';
import {EmbeddingIcon} from '../icons/sidebar/embedding-icon';
import {ClassificationIcon} from '../icons/sidebar/classification-icon';
import {FeaturesIcon} from '../icons/sidebar/features-icon';

export const SidebarWrapper = () => {
   const router = useRouter();
   const {collapsed, setCollapsed} = useSidebarContext();

   return (
      <Box
         as="aside"
         css={{
            height: '100vh',
            zIndex: 202,
            position: 'sticky',
            top: '0',
         }}
      >
         {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

         <Sidebar collapsed={collapsed}>
            <Sidebar.Header>
               <Flex align={'center'} css={{gap: '$4', px: '$4', py: '$2'}}>
                  <Box
                     css={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '$lg',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                     }}
                  >
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </Box>
                  <Box>
                     <Box css={{color: '$accents9', fontWeight: '$semibold', fontSize: '$lg', lineHeight: 1.2}}>
                        NLP Dashboard
                     </Box>
                     <Box css={{color: '$accents6', fontSize: '$xs', lineHeight: 1.2}}>
                        ICAR Agriculture
                     </Box>
                  </Box>
               </Flex>
            </Sidebar.Header>
            <Flex
               direction={'column'}
               justify={'between'}
               css={{height: '100%'}}
            >
               <Sidebar.Body className="body sidebar">
                  <SidebarItem
                     title="Overview"
                     icon={<HomeIcon />}
                     isActive={router.pathname === '/'}
                     href="/"
                  />
                  <SidebarMenu title="Analisis NLP">
                     <SidebarItem
                        isActive={router.pathname === '/dataset'}
                        title="Dataset & Preprocessing"
                        icon={<DatasetIcon />}
                        href="/dataset"
                     />
                     <SidebarItem
                        isActive={router.pathname === '/features'}
                        title="Ekstraksi Fitur"
                        icon={<FeaturesIcon />}
                        href="/features"
                     />
                     <SidebarItem
                        isActive={router.pathname === '/embedding'}
                        title="Word Embedding"
                        icon={<EmbeddingIcon />}
                        href="/embedding"
                     />
                     <SidebarItem
                        isActive={router.pathname === '/classification'}
                        title="Klasifikasi"
                        icon={<ClassificationIcon />}
                        href="/classification"
                     />
                  </SidebarMenu>

                  <SidebarMenu title="Laporan">
                     <SidebarItem
                        isActive={router.pathname === '/reports'}
                        title="Laporan Hasil"
                        icon={<ReportsIcon />}
                        href="/reports"
                     />
                  </SidebarMenu>
               </Sidebar.Body>
               <Sidebar.Footer>
                  <Tooltip content={'Settings'} rounded color="primary">
                     <SettingsIcon />
                  </Tooltip>
                  <Tooltip content={'Filter'} rounded color="primary">
                     <FilterIcon />
                  </Tooltip>
                  <Tooltip content={'Profile'} rounded color="primary">
                     <Avatar
                        text="NLP"
                        size={'sm'}
                        color="gradient"
                     />
                  </Tooltip>
               </Sidebar.Footer>
            </Flex>
         </Sidebar>
      </Box>
   );
};
