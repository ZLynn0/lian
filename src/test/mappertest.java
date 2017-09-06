package test;

import java.io.IOException;
import java.io.InputStream;

import mapper.DeptMapper;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import entity.Dept;

public class mappertest {
	private static SqlSessionFactory factory=null;
	static{
		String resourse="mybatis-core.xml";

			InputStream inputStream;
			try {
				inputStream = Resources.getResourceAsStream(resourse);
				factory=new SqlSessionFactoryBuilder().build(inputStream);

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
	}
	@Test
	public void testDeptno(){
		SqlSession session=factory.openSession();
		DeptMapper mapper=session.getMapper(DeptMapper.class);
		Dept dept=mapper.getDeptByDepeNo(10);
		System.out.println(dept);
	}
	@Test
	public void testinsert(){
		SqlSession session=factory.openSession();
		DeptMapper mapper=session.getMapper(DeptMapper.class);
		Dept dept=new Dept("dd", 90, "dd");
		
		mapper.insert(dept);
		session.commit();
		session.close();
	}	
	@Test
	public void testupdate(){
		SqlSession session=factory.openSession();
		DeptMapper mapper=session.getMapper(DeptMapper.class);
		
		Dept dept=new Dept("aa", 90, "aa");
		mapper.update(dept);
		session.commit();
		session.close();
	}
	@Test
	public void testdelete(){
		SqlSession session=factory.openSession();
		DeptMapper mapper=session.getMapper(DeptMapper.class);
		
		Integer deptno=90;
		mapper.delete(deptno);
		session.commit();
		session.close();
	}

}
