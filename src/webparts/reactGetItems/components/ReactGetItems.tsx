import * as React from 'react';
import styles from './ReactGetItems.module.scss';
import type { IReactGetItemsProps } from './IReactGetItemsProps';
import * as jquery from 'jquery';
import { ActionButton} from 'office-ui-fabric-react';

export interface IReactGetItemsState{
  items: [
    {
      "EmployeeName": "",
      "EmployeeID": "",
      "Experience":"",
      "Location":""
    }
]
}

export default class ReactGetItems extends React.Component<IReactGetItemsProps, IReactGetItemsState> {
  public constructor(props: IReactGetItemsProps, state: IReactGetItemsState){
      super(props);
      this.state = {
          items: [
              {
                "EmployeeName": "",
                "EmployeeID": "",
                "Experience":"",
                "Location":""
              }
            ]
      };
    }

    public loadData(){
      var reactHandler = this;
      jquery.ajax({
        url: `${this.props.siteurl}/_api/web/lists/getbytitle('EmployeeList')/items`,
        type: "GET",
        headers:{'Accept':'application/json; odata=verbose;'},
        success: function(resultData){
            reactHandler.setState({
                items: resultData.d.results
              });
            },
                error: function(jqXHR, textStatus, errorThrown) {
            }
            });
    }

    public componentDidMount(){
   this.loadData();
   setInterval(this.loadData,180000);
    }

    public buttonClicked () {
      this.loadData();
      this.render();
  }

  public addButtonClicked () {
    
}

  public render(): React.ReactElement<IReactGetItemsProps> {
    return (
 <div className={styles.panelStyle}>
<br></br>
<br></br>
<div className={styles.tableCaptionStyle}>Demo: Retrieve SharePoint List Items Using SPFx, REST API and React JS</div>
<br></br><div>
        <ActionButton iconProps={{ iconName: 'refresh' }} onClick={() => this.buttonClicked()}>Refresh</ActionButton><ActionButton iconProps={{ iconName: 'circleplus' }} onClick={() => this.addButtonClicked()}>Add</ActionButton>
    </div>
<div className={styles.headerCaptionStyle}>Employee Details</div>
<div className={styles.tableStyle}>
  <div className={styles.headerStyle}>
    <div className={styles.CellStyle}>Employee Name</div>
    <div className={styles.CellStyle}>Employee ID</div>
    <div className={styles.CellStyle}>Experience</div>
    <div className={styles.CellStyle}>Location</div>
  </div>
  {this.state.items.map(function(item,key){
    return(<div className={styles.rowStyle} key={key}>
      <div className={styles.CellStyle}>{item.EmployeeName}</div>
      <div className={styles.CellStyle}>{item.EmployeeID}</div>
      <div className={styles.CellStyle}>{item.Experience}</div>
      <div className={styles.CellStyle}>{item.Location}</div>
    </div>);
  })}
  </div>
  </div>
  
);
}
}