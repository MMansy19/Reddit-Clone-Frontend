import '../Settings.css';
import Header from '../components/Header';
import SettingsNav from '../components/Settings/SettingsNav';
function Settings() {
  return (
  <div >
    <Header/>
    <div className="header">
    <h1 className='title'>User Settings</h1>
    <SettingsNav/>
    <div class="horizontalLine"></div>
  </div>
</div>
    );
}

export default Settings;
