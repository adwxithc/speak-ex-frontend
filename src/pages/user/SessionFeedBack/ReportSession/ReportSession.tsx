import { Handshake } from 'lucide-react';
import Button from '../../../../components/ui/Button/Button';
import Modal from '../../../../components/custom/Modal/Modal';
import { AnimatePresence } from 'framer-motion';
import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useState,
} from 'react';
import ReportForm from './ReportForm';
import { useReportSessionMutation } from '../../../../redux/features/user/session/sessionApiSlice';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function ReportSession({
    setInAction,
}: {
    setInAction: Dispatch<SetStateAction<boolean>>;
}) {
    const [openReportModal, setOpenReportModal] = useState(false);
    const { sessionCode = '' } = useParams();
    const [text, setText] = useState('');
    const [reportSession] = useReportSessionMutation();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const result = await reportSession({
                description: text,
                sessionCode,
            }).unwrap();
            if (result.success) {
                setOpenReportModal(false);
                setText('');
                toast.success(result.message, { position: 'top-center' });
            }
        } catch (error) {
            toast('something went wrong');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleOpenReportModal = () => {
        setInAction(true);
        setOpenReportModal(true);
    };

    const handleCloseModal = () => {
        setOpenReportModal(false)
        setInAction(false);
    };
    return (
        <>
            <div className="p-4 shadow mt-20  rounded  sm:max-w-[50vw] mx-auto bg-gray-50 ">
                <div className="flex flex-col sm:flex-row  items-center ">
                    <div className="px-2">
                        <Handshake size={50} color="#00255F" />
                    </div>

                    <p className="text-gray-900 ml-2 text-justify">
                        {' '}
                        Please take a moment to report any issues you
                        encountered during your session or provide feedback on
                        the speaking quality. Your feedback helps us enhance the
                        speaking practice experience for all users.
                    </p>
                </div>
                <div className="flex justify-end ">
                    <Button
                        onClick={handleOpenReportModal}
                        varient={'danger-outline'}
                        size={'sm'}
                    >
                        Report
                    </Button>
                </div>
            </div>
            <AnimatePresence initial={false} mode="wait">
                {openReportModal && (
                    <Modal
                        position="top-20"
                        loading={false}
                        handleClose={handleCloseModal}
                    >
                        <ReportForm {...{ handleChange, handleSubmit, text }} />
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
}

export default ReportSession;
