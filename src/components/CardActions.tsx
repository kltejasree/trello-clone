import {Button} from 'antd';
import {
  PlusOutlined,
  TagOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons'

import AddChecklist from './Addchecklist'

interface addCheckListProps {
  onAddChecklist: (checkListTitle: string) => Promise<void>
}

const CardActions = ({ onAddChecklist }: addCheckListProps) => {
  return (
    <div className="flex gap-3 mt-5 pl-8 flex-wrap">

      <Button>
        <PlusOutlined />
        <span className="ml-1.5">Add</span>
      </Button>

      <Button>
        <TagOutlined />
        <span className="ml-1.5">Labels</span>
      </Button>

      <Button>
        <ClockCircleOutlined />
        <span className="ml-1.5">Dates</span>
      </Button>

      <AddChecklist onAddChecklist={onAddChecklist} />

      <Button>
        <UserAddOutlined />
        <span className="ml-1.5">Members</span>
      </Button>

    </div>
  )
}

export default CardActions