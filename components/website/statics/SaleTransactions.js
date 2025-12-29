import React from 'react'
import Chart from 'react-google-charts';
const SaleTransactions = () => {
    const data = [
        ['Task', ''],
        ['2014', 14500],
        ['2015', 11200],
        ['2016', 8600],
        ['2017', 14700],
        ['2018',8800],
        ['2019',8700],
        ['2020',9900],
        ['2021',11600],
        ['2022',20500],
        ['2023',30900]
      ];
  return (
    <>
                <div className='container'>
                    <h4 className='text-center section-title'>Number of property sales transactions in Dubai over years based on the Dubai Land Department</h4>
                <div className='row'>
                    <div className='col-md-12'>
                    <Chart
                        chartType="BarChart" // Use "BarChart" for horizontal bar chart
                        loader={<div>Loading Chart</div>}
                        data={data}
                        options={{
                            title: '',
                            backgroundColor: 'transparent',
                            tooltip: {
                            isHtml: true,
                            textStyle: { color: '#333' },
                            showColorCode: false,
                            },
                            hAxis: {
                                textStyle: {
                                    color: '#fff', 
                                    bold:true// Change the horizontal axis text color to blue
                                },
                                gridlines: {
                                    color: 'transparent', // Change the color of horizontal gridlines
                                  },
                                },
                                vAxis: {
                                textStyle: {
                                    color: '#fff',
                                    bold:false,
                                    fontSize:15 // Change the vertical axis text color to green
                                },
                                },
                            responsive: true,
                            chartArea: {
                                left: '5%',   // Adjust the margins within the chart area
                                top: '10%',
                                width: '100%', // Set the width of the chart area
                                height: '80%', // Set the height of the chart area
                              },
                            colors: ['#00AAA9'], // Set colors for 2022 and 2023 bars
                            width: '500px',
                            height: '400px',
                        }}
                        />
                    </div>
                </div>
                </div>
                <style>
             {`
             .section-title{
              font-size: 25px;
              font-weight: bolder;
              border: 4px solid;
              border-image: var(--two-side-border);
              padding: 10px;
             }
            
             `}
             </style>
    </>
  )
}

export default SaleTransactions
