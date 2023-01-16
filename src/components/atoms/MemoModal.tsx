import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
};

const MemoModal = ({ isOpen, onClose, content }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>메모</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>닫기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MemoModal;
