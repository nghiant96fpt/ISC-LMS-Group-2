interface AddressType {
  addressList: Address[];
  type?: boolean;
}
interface Address {
  linkName: string;
  link: string;
}

export default AddressType;
