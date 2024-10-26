"use client";

import { useModal } from "@/src/hooks/use-modal";

import InviteNomadModal from "../modals/invite-nomad-modal";
import { Breadcrumb, Button, Pannel } from "@/src/components";

const InternalNomadsListView = () => {
  const inviteModal = useModal();

  return (
    <Pannel className="!py-8">
      <Breadcrumb
        title="Internal Nomads"
        action={
          <Button type="button" onClick={inviteModal.onTrue}>
            Invite Nomad
          </Button>
        }
      />

      {inviteModal.onTrue && (
        <InviteNomadModal
          isOpen={inviteModal.value}
          onClose={inviteModal.onFalse}
        />
      )}

      
    </Pannel>
  );
};

export default InternalNomadsListView;
