<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let rooms = [
    { id: 'living', name: '거실', icon: '🛋️', position: { x: 0, y: 3, z: 8 }, lookAt: { x: 0, y: 0, z: 0 } },
    { id: 'kitchen', name: '주방', icon: '🍳', position: { x: -6, y: 3, z: 0 }, lookAt: { x: -3, y: 0, z: 0 } },
    { id: 'bedroom', name: '침실', icon: '🛏️', position: { x: 6, y: 3, z: 0 }, lookAt: { x: 3, y: 0, z: 0 } },
    { id: 'bathroom', name: '화장실', icon: '🚿', position: { x: 0, y: 3, z: -6 }, lookAt: { x: 0, y: 0, z: -3 } }
  ];

  export let currentRoom = 'living';

  function selectRoom(room) {
    currentRoom = room.id;
    dispatch('roomChange', {
      room: room,
      position: room.position,
      lookAt: room.lookAt
    });
  }

  function getRoomClass(roomId) {
    return currentRoom === roomId ? 'room-item active' : 'room-item';
  }
</script>

<div class="room-navigation">
  <h3>방 선택</h3>
  <div class="room-list">
    {#each rooms as room (room.id)}
      <button 
        class={getRoomClass(room.id)}
        on:click={() => selectRoom(room)}
      >
        <span class="room-icon">{room.icon}</span>
        <span class="room-name">{room.name}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .room-navigation {
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .room-navigation h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }

  .room-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .room-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 10px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    transform: scale(1);
  }

  .room-item:active {
    transform: scale(0.95);
  }

  .room-item:hover {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
  }

  .room-item.active {
    border-color: #007bff;
    background: #f8f9ff;
    color: #007bff;
  }

  .room-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .room-name {
    font-weight: 500;
  }
</style>
