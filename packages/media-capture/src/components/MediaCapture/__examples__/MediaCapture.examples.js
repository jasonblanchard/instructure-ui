/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react'
import MediaCapture from '../index'
import Button from '@instructure/ui-buttons/lib/components/Button'
import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton'
import Modal, { ModalBody } from '@instructure/ui-overlays/lib/components/Modal'

class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  onCompleted = (file) => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(file)
    a.download = `${file.name}.webm`
    a.style = { display: 'none' }
    this.container.append(a)
    a.click()
    URL.revokeObjectURL(a.href)
    a.remove()
    this.setState({ isOpen: false })
  }

  onClose = (state) => {
    this.setState({ isOpen: false }, () => {
      console.log(`MediaCapture closed: ${state}`) // eslint-disable-line no-console
    })
  }

  renderCloseButton () {
     return (
       <CloseButton
         placement="end"
         offset="medium"
         variant="icon"
         onClick={() => this.setState({ isOpen: false })}
       >
         Close
       </CloseButton>
     )
   }

  render () {
    return (
      <div ref={el => this.container = el}>
        <Button onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }}>
          Show Media Capture Modal
        </Button>
        <Modal
          open={this.state.isOpen}
          onDismiss={() => { this.setState({ isOpen: false }) }}
          label="Media Capture"
          shouldCloseOnDocumentClick
        >
          <ModalBody padding="xx-large">
            {this.renderCloseButton()}
            <MediaCapture onCompleted={this.onCompleted} onClose={this.onClose} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export const basicUsage = () => <Example />
