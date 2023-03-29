import { Col, Empty, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

export interface TableRowData {
  key: React.Key;
  assetPair: string;
  provider: {
    name: string;
    endpoint: string;
  };
  baseAmount?: string;
  quoteAmount?: string;
  percentageFee?: {
    baseAsset?: string;
    quoteAsset?: string;
  };
  fixedFee: {
    baseAsset?: string;
    quoteAsset?: string;
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
      sorter: (a, b) => a.provider.name.localeCompare(b.provider.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Base Amount',
      dataIndex: 'baseAmount',
      render: (baseAmount?: number) => baseAmount?.toString() ?? 'N/A',
    },
    {
      title: 'Quote Amount',
      dataIndex: 'quoteAmount',
      render: (quoteAmount?: number) => quoteAmount?.toString() ?? 'N/A',
    },
  ];
};

const TableComponent: React.FC<{ data: TableRowData[]; searchText: string }> = ({ data, searchText }) => (
  <Table
    columns={columns(searchText)}
    locale={{
      emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Loading data..." />,
    }}
    dataSource={data.sort((a, b) => a.assetPair.localeCompare(b.assetPair))}
    expandable={{
      expandedRowRender: (record) => (
        <Col span={24}>
          <Row>
            <Col xs={10} sm={8} md={6} lg={4} className="bold">
              Provider endpoint:
            </Col>
            <Col xs={14} sm={16} md={18} lg={20}>
              {record.provider.endpoint}
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={8} md={6} lg={4} className="bold">
              Base relative fee:
            </Col>
            <Col xs={14} sm={16} md={18} lg={20}>
              {record.percentageFee?.baseAsset ? `${record.percentageFee.baseAsset}%` : 'N/A'}
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={8} md={6} lg={4} className="bold">
              Quote relative fee:
            </Col>
            <Col xs={14} sm={16} md={18} lg={20}>
              {record.percentageFee?.quoteAsset ? `${record.percentageFee.quoteAsset}%` : 'N/A'}
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={8} md={6} lg={4} className="bold">
              Base fixed fee:
            </Col>
            <Col xs={14} sm={16} md={18} lg={20}>
              {record.fixedFee.baseAsset ?? 'N/A'}
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={8} md={6} lg={4} className="bold">
              Quote fixed fee:
            </Col>
            <Col xs={14} sm={16} md={18} lg={20}>
              {record.fixedFee.quoteAsset ?? 'N/A'}
            </Col>
          </Row>
        </Col>
      ),
    }}
  />
);

export default TableComponent;
