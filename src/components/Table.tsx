import { Col, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

export interface TableRowData {
  key: React.Key;
  assetPair: string;
  provider: {
    name: string;
    endpoint: string;
  };
  baseAmount: string;
  quoteAmount: string;
  basisPoint: string;
  fixed: {
    baseFee: string;
    quoteFee: string;
  };
}

const columns = (searchText: string): ColumnsType<TableRowData> => {
  return [
    {
      title: 'Asset Pair',
      dataIndex: 'assetPair',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        // Filter by asset pair or provider name
        return (
          record.assetPair.toUpperCase().includes(String(value).toUpperCase()) ||
          record.provider.name.toUpperCase().includes(String(value).toUpperCase())
        );
      },
      sorter: (a, b) => a.assetPair.localeCompare(b.assetPair),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Provider',
      dataIndex: ['provider', 'name'],
      filteredValue: [searchText],
      sorter: (a, b) => a.provider.name.localeCompare(b.provider.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Base Amount',
      dataIndex: 'baseAmount',
    },
    {
      title: 'Quote Amount',
      dataIndex: 'quoteAmount',
    },
  ];
};

const TableComponent: React.FC<{ data: TableRowData[]; searchText: string }> = ({ data, searchText }) => (
  <Table
    columns={columns(searchText)}
    dataSource={data.sort((a, b) => a.assetPair.localeCompare(b.assetPair))}
    expandable={{
      expandedRowRender: (record) => (
        <Col span={24}>
          <Row>
            <Col xs={10} sm={8} md={6} lg={4}>
              Provider endpoint:
            </Col>
            <Col xs={14} sm={16} md={18} lg={20}>
              {record.provider.endpoint}
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={8} md={6} lg={4}>
              Base percentage fee:
            </Col>
            <Col xs={14} sm={16} md={18} lg={20}>
              {record.basisPoint}
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={8} md={6} lg={4}>
              Quote percentage fee:
            </Col>
            <Col xs={14} sm={16} md={18} lg={20}>
              {record.basisPoint}
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={8} md={6} lg={4}>
              Base fixed fee:
            </Col>
            <Col xs={14} sm={16} md={18} lg={20}>
              {record.fixed.baseFee}
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={8} md={6} lg={4}>
              Quote fixed fee:
            </Col>
            <Col xs={14} sm={16} md={18} lg={20}>
              {record.fixed.quoteFee}
            </Col>
          </Row>
        </Col>
      ),
    }}
  />
);

export default TableComponent;
