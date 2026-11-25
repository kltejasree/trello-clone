import { Button, Card } from 'antd'
import { archiveList } from '../api/List'

const ArchiveList = ({ listId, refreshLists }) => {

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
            className="w-[180px]"
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