import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

function Home() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleSubmit() {
    if (input.trim() !== '') {
      const newTask = {
        text: input,
        urgent: document.getElementById('urgent').checked,
        completed: false // Ajouter l'état pour suivre si la tâche est cochée ou non
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setInput('');
    }
  }

  function handleDelete(index) {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  }

  function handleCheck(index) {
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.addContainer}>
          <input type="text" placeholder="Task" id="taskName" className={styles.addTask} onChange={(e) => { setInput(e.target.value) }} value={input} />
          <div className={styles.urgentSection}>
            <input type="checkbox" id="urgent" className={styles.urgentCheckbox} />
            <span className={styles.urgent}>URGENT</span>
          </div>
          <button id="add" className={styles.button} onClick={() => handleSubmit()}>ADD TASK</button>
        </div>

        <div className={styles.tasksContainer}>
          {tasks.map((task, index) => (
            <div className={`${styles.task} ${task.completed ? styles.completed : ''}`} key={index}>
              <div className={styles.taskSection}>
                <input type="checkbox" className={styles.completeCheckbox} onChange={() => handleCheck(index)} checked={task.completed} />
                <p className={`${task.completed ? styles.completedText : ''}`}>{task.text}</p>
                {task.urgent && <span className={styles.urgentBadge}>URGENT</span>}
              </div>
              <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={() => handleDelete(index)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
