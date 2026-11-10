import { Flex, Progress } from 'antd'

const ProgressBar = ({ val = 0 }) => {
    return (
        <Flex vertical className="w-full my-2">
            <Progress
                percent={val}
                strokeColor={val === 100 ? '#5e9e24' : '#0c66e4'}
                railColor="#dfe1e6"
                percentPosition={{
                    align: 'start',
                    type: 'outer',
                }}
                format={(percent) => (
                    <span className="text-xs text-gray-700">
                        {percent}%
                    </span>
                )}
            />
        </Flex>
    )
}

export default ProgressBar
