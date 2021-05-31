import { Card, Col, Input, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import dubaiImage from '../../assets/dubai.jpg';
import londonImage from '../../assets/london.jpg';
import losAngelesImage from '../../assets/los-angeles.jpg';
import torontoImage from '../../assets/toronto.jpg';

require('dotenv').config();

const { Title } = Typography;
const { Search } = Input;

interface Props {
  onSearch: (value: string) => void;
}

export const HomeHero = ({ onSearch }: Props) => {
  return (
    <div className="home-hero">
      <div className="home-hero__search">
        <Title className="home-hero__title">
          Find a place you'll love to stay at
        </Title>
        <Search
          placeholder="Search 'San Francisco'"
          size="large"
          enterButton
          className="home-hero__search-input"
          onSearch={onSearch}
        />
      </div>
      <Row gutter={12} className="home-hero__cards">
        <Col xs={12} md={6}>
          <Link to="/listings/toronto">
            <Card cover={<img src={torontoImage} alt="Toronto" />}>
              Toronto
            </Card>
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Link to="/listings/dubai">
            <Card cover={<img src={dubaiImage} alt="Dubai" />}>Dubai</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/listings/los%20angeles">
            <Card cover={<img src={losAngelesImage} alt="los angeles" />}>
              Los Angeles
            </Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/listings/london">
            <Card cover={<img src={londonImage} alt="London" />}>London</Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
