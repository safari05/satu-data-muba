import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ContentPieChart = ({
    labels = [],
    dataSeries = [],
    background = [],
}) => {
    if (!Array.isArray(labels) || !Array.isArray(dataSeries) || labels.length === 0 || dataSeries.length === 0) {
        console.error('Invalid data provided:', { labels, dataSeries });
        return null; 
    }

    const validDataSeries = dataSeries.map(num => (typeof num === 'number' ? num : 0));

    const options = {
        labels: labels,
        colors: background, 
        chart :{
            height: 350,
            toolbar: {
                show: true,
                tools: {
                    download: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>`,
                },
            },
            export: {
                csv: {
                    filename: 'chart_data',
                    columnDelimiter: ',',
                    headerCategory: 'Category',
                    headerValue: 'Value',
                },
            },
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return opts.w.globals.series[opts.seriesIndex]; 
            },
        },
        fill: {
            type: 'gradient',
        },
        legend: {
            formatter: function (val, opts) {
                return `${val} - ${opts.w.globals.series[opts.seriesIndex]}`;
            },
            position: 'bottom'
        }
    };

    return (
        <div className='w-full'>
            <ReactApexChart type='pie' options={options} series={validDataSeries} height={350} />
        </div>
    );
};

ContentPieChart.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    dataSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
    background: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ContentPieChart;
