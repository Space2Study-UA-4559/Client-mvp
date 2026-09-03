import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import PopupDialog from '~/components/popup-dialog/PopupDialog'

vi.mock('~/hooks/use-confirm', () => ({
  default: () => ({ checkConfirmation: vi.fn().mockResolvedValue(true) })
}))

vi.mock('~/hooks/use-breakpoints', () => ({
  default: () => ({ isMobile: false })
}))

describe('PopupDialog', () => {
  it('should not close when clicking outside (backdrop click)', () => {
    const closeModal = vi.fn()
    render(
      <PopupDialog
        closeModal={closeModal}
        content={<div>Popup content</div>}
        paperProps={{}}
      />
    )

    const backdrop = document.querySelector('.MuiBackdrop-root')
    fireEvent.click(backdrop)

    expect(closeModal).not.toHaveBeenCalled()
  })
})
