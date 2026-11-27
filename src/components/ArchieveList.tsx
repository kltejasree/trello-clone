import { Button, Card } from 'antd'
import { archiveList } from '../api/List'

interface ArchieveListProps {
    listId: string;
    refreshLists: () => Promise<void>;
}

const ArchiveList = ({ listId, refreshLists }: ArchieveListProps) => {

    const handleArchive = async () => {
        try {
            await archiveList(listId)
            await refreshLists()
        } catch (error) {
            console.log('Error archiving list:', error)
        }
    }

    return (
        <Card
            className="w-45"
            styles={{ body: { padding: '12px' } }}
        >
            <Button
                danger
                block
                onClick={handleArchive}
            >
                Archive List
            </Button>
        </Card>
    )
}

export default ArchiveList