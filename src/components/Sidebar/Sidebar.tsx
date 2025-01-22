// components/Sidebar/Sidebar.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { DatePicker, Select, Switch } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { SidebarContainer, FlexRowDivStyle, FlexColumnDivStyle } from './SidebarStyles';

interface SidebarProps {
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
  }


const Sidebar : React.FC<SidebarProps> = ({ showSidebar, setShowSidebar })=>{
  const [tags, setTags] = useState<string[]>([]);
  const [isActive, setIsActive] = useState<boolean | null>(null);
  return (
    <SidebarContainer showSidebar={showSidebar}>

<FlexRowDivStyle>
        <h3 style={{ display: showSidebar ? 'block' : 'none' }}>Filters</h3>
        {!showSidebar ? (
          <MenuUnfoldOutlined onClick={() => setShowSidebar(true)} />
        ) : (
          <MenuFoldOutlined onClick={() => setShowSidebar(false)} />
        )}
      </FlexRowDivStyle>

        {showSidebar && <FlexColumnDivStyle $gap='16px'>
      
      <FlexColumnDivStyle $gap='8px'>
        <label>Date Range</label>
        <DatePicker.RangePicker />
      </FlexColumnDivStyle>
      <FlexRowDivStyle $gap='8px'>
        <label>Tags</label>
        <Select
          mode="multiple"
          placeholder="Select tags"
          value={tags}
          onChange={setTags}
          options={[
            { value: 'Finance', label: 'Finance' },
            { value: 'Marketing', label: 'Marketing' },
          ]}
        />
      </FlexRowDivStyle>
      <FlexRowDivStyle $gap='8px'>
        <label>Status</label>
        <Switch
          checked={isActive === true}
          onChange={(checked) => setIsActive(checked)}
        />
      </FlexRowDivStyle>
      </FlexColumnDivStyle>}

 

    </SidebarContainer>
  );
};

export default Sidebar;