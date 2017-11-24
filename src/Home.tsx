import * as React from 'react'

const classNames = require('classnames/bind')

const cx = classNames.bind(require('./style/home.scss'))


export default class Home extends React.Component<{}, {}> {

    render() {
        return (
            <div className={cx('wrap')}>
                <div className={cx('content')}>
                    Home
                </div>
            </div>
        )
    }
}
