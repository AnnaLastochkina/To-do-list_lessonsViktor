import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AppWithRedux from "../AppwithRedux";
import {store} from "../Store/store";
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "../Store/ReduxStoreProviderDecorator";


export default {
    title: 'TODOLISTS/APPWITHREDUX',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/>


export const AppWithReduxStory = Template.bind({});
AppWithReduxStory.args = {};


