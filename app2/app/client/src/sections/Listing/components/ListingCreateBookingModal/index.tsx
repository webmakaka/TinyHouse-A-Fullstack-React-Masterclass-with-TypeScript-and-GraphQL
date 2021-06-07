import { HomeOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, Typography } from 'antd';
import { formatListingPrice } from 'lib/utils';
import moment, { Moment } from 'moment';

const { Paragraph, Title, Text } = Typography;

interface IProps {
  price: number;
  modalVisible: boolean;
  checkInDate: Moment;
  checkOutDate: Moment;
  setModalVisible: (modalVisible: boolean) => void;
}

export const ListingCreateBookingModal = ({
  price,
  modalVisible,
  checkInDate,
  checkOutDate,
  setModalVisible,
}: IProps) => {
  const daysBooked = checkOutDate.diff(checkInDate, 'days') + 1;
  const listingPrice = price * daysBooked;
  const tinyHouseFee = 0.05 * listingPrice;
  const totalPrice = listingPrice + tinyHouseFee;

  return (
    <Modal
      visible={modalVisible}
      centered
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      <div className="listing-booking-modal">
        <div className="listing-booking-modal__intro">
          <Title className="listing-booking-modal__intro-title">
            <HomeOutlined />
          </Title>
          <Title level={3} className="listing-booking-modal__intro-title">
            Book your trip
          </Title>
          <Paragraph>
            Enter your payment information to book the listing from the dates
            between{' '}
            <Text mark strong>
              {moment(checkInDate).format('DD/MM/YYYY')}
            </Text>{' '}
            and{' '}
            <Text mark strong>
              {moment(checkOutDate).format('DD/MM/YYYY')}
            </Text>
            , inclusive.
          </Paragraph>
        </div>
        <Divider />
        <div className="listing-booking-modal__charge-summary">
          <Paragraph>
            {formatListingPrice(price, false)} * {daysBooked} days ={' '}
            <Text strong>{formatListingPrice(listingPrice, false)}</Text>
          </Paragraph>
          <Paragraph>
            TinyHouse Fee <sub>~ 5%</sub> ={' '}
            <Text strong>{formatListingPrice(tinyHouseFee)}</Text>
          </Paragraph>
          <Paragraph className="listing-booking-modal__charge-summary-total">
            Total = <Text mark>{formatListingPrice(totalPrice)}</Text>
          </Paragraph>
        </div>

        <Divider />
        <div className="listing-booking-modal__stripe-card-section">
          <Button
            size="large"
            type="primary"
            className="listing-booking-modal__cta"
          >
            Book
          </Button>
        </div>
      </div>
    </Modal>
  );
};
