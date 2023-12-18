import * as React from 'react';
import * as ReactDom from 'react-dom';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import ReactGetItems from './components/ReactGetItems';
import { IReactGetItemsProps } from './components/IReactGetItemsProps';

export interface IReactGetItemsWebPartProps {
  description: string;
}

export default class ReactGetItemsWebPart extends BaseClientSideWebPart<IReactGetItemsWebPartProps> {



  public render(): void {
    const element: React.ReactElement<IReactGetItemsProps > = React.createElement(
    ReactGetItems,
    {
    description: this.properties.description,
    siteurl: this.context.pageContext.web.absoluteUrl,
    username: this.context.pageContext.user.displayName
    }
    );
   
    ReactDom.render(element, this.domElement);
    }
  }
